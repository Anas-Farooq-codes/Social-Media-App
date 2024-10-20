import { message } from "antd";

export async function GET() {
    return Response.json({ message: "Hello World!" })
}