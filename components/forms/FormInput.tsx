import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { capitalizeFirstLetter } from "@/lib/utils/textUtils";
import { Control } from "react-hook-form";

interface FormInputProps {
  formName: string;
  placeholder?: string;
  control: Control | any;
}

export default function FormInput({
  formName,
  placeholder,
  control,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start gap-1 w-full">
          <FormLabel className="text-base-semibold text-light-2">
            {capitalizeFirstLetter(formName)}
          </FormLabel>
          <FormControl className="flex-1 text-base-semibold text-gray-200">
            <Input
              className="account-form_input no-focus"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
