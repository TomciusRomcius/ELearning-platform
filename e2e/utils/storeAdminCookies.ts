import { BrowserContext } from "@playwright/test";

export async function storeAdminCookies(context: BrowserContext) {
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..dvvFXqSDy3T4YXCw.yNrybj6_JvmyopP03RhPquuikkr1ZQ3-LdJotdtcpNEPgpXe_wpPPnG1BO78aApqBNHSBbQ_T4JfcQ8oYhnJx-K8o0zi5w5vCJEqevOu_4TAWalaYy9oeoxQ3GnjBfkBsGy77WepRvYRJJMQqxfKAoR2NiJ0815ZZRqEs9H0E-zvA4hzmnQyZhmn6_8A4zeAk4Ak1E0q8-hdRjBTgypvZM703gXmSDFxgu2dy0rFeA.RQI9M9Iaio1osxy5IGiytw',
      domain: 'localhost', // Replace with your actual domain
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax' // or 'Strict' depending on your setup
    }
  ]);

  await context.addCookies([
    {
      name: 'next-auth.csrf-token',
      value: '31307cc0956a5836d330e3f18ba526c87d188fa271279bef67403fdbad534414%7C916354c2b20f9b6d3a54666fcf5321ceb6eca282ca215f619ff5d9ee71c3f227',
      domain: 'localhost', // Replace with your actual domain
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax' // or 'Strict' depending on your setup
    }
  ]);
}