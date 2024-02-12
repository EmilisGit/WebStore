CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    registration_date date DEFAULT CURRENT_DATE,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT constraint_emails_unique UNIQUE (email)
)
