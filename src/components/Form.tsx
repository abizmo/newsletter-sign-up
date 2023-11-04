import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Valid email required")
    .email("Valid email required"),
});

type FormState = z.infer<typeof formSchema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  const groupClasses = ["form__group"];

  if (errors.email) groupClasses.push("form__group-error");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={groupClasses.join(" ")}>
        <div className="form__header">
          <label htmlFor="email">Email address</label>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <input
          type="email"
          {...register("email")}
          placeholder="email@company.com"
        />
      </div>
      <button type="submit">Subscribe to monthly newsletter</button>
    </form>
  );
}
