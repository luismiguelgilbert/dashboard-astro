import z from 'zod/v4';

const ParamsSchema = z.object({
  sort: z.literal(['user_name', 'user_lastname', 'email']),
  page: z.coerce.number(),
  search: z.string().optional().nullable(),
});

const DefaultParamsSchema = ParamsSchema.extend({
  sort: ParamsSchema.shape.sort.catch('user_name'),
  page: ParamsSchema.shape.page.catch(1),
});

export { ParamsSchema, DefaultParamsSchema };
