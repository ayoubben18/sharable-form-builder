# Sharable Form Builder

A sharable form builder built with Next.js, Shadcn/UI.

Preview the project [here](https://sharable-form-builder.vercel.app/)
Visit the repository [here](https://github.com/ayoubben18/sharable-form-builder)
Visit My github [here](https://github.com/ayoubben18)

## Features

- Create sharable forms
- Preview forms
- Copy form URL
- Data validation using zod

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## How to adapt the project to your use case

- You can create save the form in the database and then use the id to get the form and display it in the preview page.
- You can collect the data in the database and use it for your own purposes, by accessing each field via the id property (\_1, \_2, \_3), read the code and the `fieldSchema` function
  in @/lib/utils to understand.
