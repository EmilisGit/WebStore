CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    registration_date date DEFAULT CURRENT_DATE,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT constraint_emails_unique UNIQUE (email)
)

INSERT INTO public.users("email") VALUES($1) RETURNING "user_id";

SELECT * FROM public.users WHERE user_id = $1;