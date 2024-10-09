import FormBuilder from "@/components/form-builder";
import PageWrapper from "@/components/page-wrapper";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper className="mt-8">
      <FormBuilder />

      <div className="flex flex-col gap-2 mt-10 items-center">
        <h1 className="text-2xl font-bold">More about me :)</h1>
        <p className="text-gray-500">
          Visit the{" "}
          <Link
            href="https://github.com/ayoubben18/sharable-form-builder"
            target="_blank"
            className="underline font-bold"
          >
            repository
          </Link>{" "}
          and give it a star{" "}
          <StarIcon className="size-4 inline-block text-yellow-500" />
        </p>
        <p className="text-gray-500">
          You can also contact me on{" "}
          <Link
            href="https://www.linkedin.com/in/ayoub-bensalah-56834b29b/"
            target="_blank"
            className="underline font-bold"
          >
            LinkedIn
          </Link>
        </p>
        <p className="text-gray-500">
          {" "}
          or visit my{" "}
          <Link
            href="https://github.com/ayoubben18"
            target="_blank"
            className="underline font-bold"
          >
            github
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
