import zod from 'zod'

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: zod.number().int().min(1900).max(2025),
  director: zod.string(),
  duration: zod.number().int().positive(),
  rate: zod.number().min(0).max(10).default(5),
  poster: zod.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: zod.array(
    zod.enum(['Drama', 'Action', 'Crime', 'Romance', 'Adventure', 'Sci-Fi', 'Animation', 'Biography', 'Fantasy']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

// eslint-disable-next-line space-before-function-paren
export function validateMovie(input) {
  return movieSchema.safeParse(input)
}

// eslint-disable-next-line space-before-function-paren
export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
