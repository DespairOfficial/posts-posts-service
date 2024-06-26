-- Create uuid7 function
create or replace function uuid7() returns uuid as $$
declare
v_time timestamp with time zone:= null;
v_secs bigint := null;
v_msec bigint := null;
v_usec bigint := null;

v_timestamp bigint := null;
v_timestamp_hex varchar := null;

v_random bigint := null;
v_random_hex varchar := null;

v_bytes bytea;

c_variant bit(64):= x'8000000000000000'; -- RFC-4122 variant: b'10xx...'
begin

-- Get seconds and micros
v_time := clock_timestamp();
v_secs := EXTRACT(EPOCH FROM v_time);
v_msec := mod(EXTRACT(MILLISECONDS FROM v_time)::numeric, 10^3::numeric);
v_usec := mod(EXTRACT(MICROSECONDS FROM v_time)::numeric, 10^3::numeric);

-- Generate timestamp hexadecimal (and set version 7)
v_timestamp := (((v_secs * 10^3) + v_msec)::bigint << 12) | (v_usec << 2);
v_timestamp_hex := lpad(to_hex(v_timestamp), 16, '0');
v_timestamp_hex := substr(v_timestamp_hex, 2, 12) || '7' || substr(v_timestamp_hex, 14, 3);

-- Generate the random hexadecimal (and set variant b'10xx')
v_random := ((random()::numeric * 2^62::numeric)::bigint::bit(64) | c_variant)::bigint;
v_random_hex := lpad(to_hex(v_random), 16, '0');

-- Concat timestemp and random hexadecimal
v_bytes := decode(v_timestamp_hex || v_random_hex, 'hex');

return encode(v_bytes, 'hex')::uuid;

end $$ language plpgsql;


-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT uuid7(),
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
