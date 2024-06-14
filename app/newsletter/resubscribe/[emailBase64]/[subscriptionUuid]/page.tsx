export async function GET(req: Request) {
  try {
    return Response.json({
      todo: "method to resubscribe by updating the record in DynamoDB",
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
