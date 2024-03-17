CREATE TABLE IF NOT EXISTS public.all_orders
(
    order_id integer NOT NULL DEFAULT nextval('orders_orderno_seq'::regclass),
	payed boolean DEFAULT false,
    date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    subscription_months integer NOT NULL,
    cost double precision NOT NULL,
    order_product_ids integer[] NOT NULL,
	company_name text COLLATE pg_catalog."default",
    company_tax_code character varying(40) COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    zip_code character varying(20) COLLATE pg_catalog."default",
    company_code character varying(40) COLLATE pg_catalog."default",
    country character varying(40) COLLATE pg_catalog."default",
    CONSTRAINT order_pkey PRIMARY KEY (order_id),
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO public.orders(
	user_id, subscription_months, cost, company_id, order_product_ids)
	VALUES (1, 1, 1, 1, '{1, 2}');
