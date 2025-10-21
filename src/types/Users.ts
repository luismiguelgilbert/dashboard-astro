import z from 'zod/v4';

export const ParamsSchema = z.object({
  sort: z.literal(['user_name', 'user_lastname', 'email']),
  page: z.coerce.number(),
  search: z.string().optional().nullable(),
});
export type Params = z.infer<typeof ParamsSchema>;

export const DefaultParamsSchema = ParamsSchema.extend({
  sort: ParamsSchema.shape.sort.catch('user_name'),
  page: ParamsSchema.shape.page.catch(1),
});

export const UserRowSchema = z.object({
  email: z.string(),
  is_active: z.boolean(),
  user_lastname: z.string(),
  user_name: z.string(),
});
export type UserRow = z.infer<typeof UserRowSchema>;

export const DataResponseSchema = z.object({
  rows: z.array(UserRowSchema),
  count: z.coerce.number(),
  currentPage: z.coerce.number(),
  rowsPerPage: z.coerce.number(),
});
export type DataResponse = z.infer<typeof DataResponseSchema>;
