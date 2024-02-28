CREATE TABLE IF NOT EXISTS public.orders
(
    order_id integer NOT NULL DEFAULT nextval('orders_orderno_seq'::regclass),
    date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    subscription_months integer NOT NULL,
    cost double precision NOT NULL,
    company_id integer,
    order_product_ids integer[] NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (order_id),
    CONSTRAINT company_id_fkey FOREIGN KEY (company_id)
        REFERENCES public.companies (company_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;
