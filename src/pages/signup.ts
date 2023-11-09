import type { APIRoute } from "astro";

export const POST: APIRoute = async ({request, cookies}) => {
    const data = await request.formData();
    const email = data.get("email");

    if (!email) 
        return new Response(
            JSON.stringify({
                message: 'Email is empty'
            }), {
                status: 400
            });

    cookies.set('data', {
        email,
    });

    return new Response(
        JSON.stringify({
            message: "Success!"
        }),{
            status: 200
    }); 
}