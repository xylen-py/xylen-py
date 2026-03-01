import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

const submissions: ContactPayload[] = [];

export async function GET() {
    return NextResponse.json({
        message: "Contact API by .1xylen",
        total_submissions: submissions.length,
    });
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactPayload = await request.json();

        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { success: false, error: "All fields are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email address." },
                { status: 400 }
            );
        }

        if (body.name.length > 100 || body.message.length > 5000) {
            return NextResponse.json(
                { success: false, error: "Input too long." },
                { status: 400 }
            );
        }

        submissions.push({
            name: body.name.trim(),
            email: body.email.trim(),
            message: body.message.trim(),
        });

        console.log(`[Contact] New message from ${body.name} <${body.email}>`);

        return NextResponse.json(
            { success: true, message: "Message received successfully!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body." },
            { status: 400 }
        );
    }
}
