import { z } from "zod";

const requiredString = z.string().trim().min(1, "Tidak boleh kosong");

export const loginSchema = z.object({
  email: requiredString.email("Email tidak valid"),
  password: requiredString,
});

export type LoginValue = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: requiredString.email("Email tidak valid"),
  name: requiredString.max(30, "Nama tidak boleh lebih dari 30 karakter"),
  password: requiredString,
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const createTransactionSchema = z.object({
  description: z
    .string()
    .max(50, "Deskripsi tidak boleh lebih dari 50 karakter"),
  amount: z
    .number({ required_error: "Input harus angka" })
    .int("Tidak boleh terdapat koma")
    .positive("Input harus positif")
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Input harus angka" })
        .positive("Input harus positif")
        .int("Input tidak boleh terdapat koma"),
    ),
  category: z.string().min(1, "Kategori harus diisi"),
  date: z.date(),
});

export type CreateTransactionValues = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .max(50, "Deskripsi tidak boleh lebih dari 50 karakter"),
  amount: z
    .number({ required_error: "Input harus angka" })
    .int("Tidak boleh terdapat koma")
    .positive("Input harus positif")
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Input harus angka" })
        .positive("Input harus positif")
        .int("Input tidak boleh terdapat koma"),
    ),
  category: z.string().min(1, "Kategori harus diisi"),
  date: z.date(),
});

export type UpdateTransactionValues = z.infer<typeof updateTransactionSchema>;
