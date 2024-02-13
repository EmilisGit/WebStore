CREATE TABLE IF NOT EXISTS public.orders
(
    orderno integer NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_id integer,
    order_product_no integer NOT NULL,
    subscription_months integer,
    cost double precision NOT NULL,
    company_name character varying(30) COLLATE pg_catalog."default",
    company_code character varying(30) COLLATE pg_catalog."default",
    company_tax_code character varying(30) COLLATE pg_catalog."default",
    country character varying(50) COLLATE pg_catalog."default",
    address character varying(100) COLLATE pg_catalog."default",
    zipcode character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (orderno),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)