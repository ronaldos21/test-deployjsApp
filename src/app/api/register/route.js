import connectToDB from "@/database";
import Joi from "joi";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  //validate schema

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0].message,
    });
  }

  try {
    //if user already exists

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Try using a different email",
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully!!",
        });
      }
    }
  } catch (error) {
    console.log("Error while new user registration, Please try again!");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
