"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation, User } from "@/lib/validations/user";
import FormInput from "./FormInput";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";

interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function handleImage(
  event: ChangeEvent<HTMLInputElement>,
  fieldChange: (value: string) => void,
  setFile: (file: File[]) => void
) {
  event.preventDefault();

  const fileReader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const file = event.target.files[0];

    setFile(Array.from(event.target.files));

    if (!file.type.includes("image")) {
      return;
    }

    fileReader.onload = async () => {
      const imageUrl = fileReader.result as string;

      fieldChange(imageUrl);
    };

    fileReader.readAsDataURL(file);
  }
}

function onSubmit(values: User) {
  const blob = values.profile_photo || "";
  const hasImageChanged = isBase64Image(blob);

  if (hasImageChanged) {
    //!TODO: upload to uploadthing
  }
}

export default function AccountProfile({
  user,
  btnTitle,
}: AccountProfileProps) {
  const [file, setFile] = useState<File[]>([]);
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="./assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    priority
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo"
                  className="account-form_image-input"
                  onChange={(event) => {
                    handleImage(event, field.onChange, setFile);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormInput formName="name" control={form.control} />
        <FormInput formName="username" control={form.control} />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-1">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  className="account-form_input no-focus"
                  rows={10}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="bg-primary-500 hover:bg-primary-500/80 transition-colors duration-200"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
