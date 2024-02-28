INSERT INTO public.companies(
	company_name, company_code, company_tax_code, address)
	VALUES ('testCompany', 234238, 'LT3234234', 'Grimstad, Norway');

INSERT INTO public.orders(
	user_id, subscription_months, cost, company_id, order_product_ids)
	VALUES (1, 3, 50, 2, '{1, 3}');