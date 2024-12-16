import "../styles/globals.css";
import { Poppins, Aboreto } from "next/font/google";
import { getMenu } from "utils/getMenu";
import MainMenu from "components/MainMenu";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins",
});
const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-aboreto",
});
export default async function RootLayout({ children }) {
  const data = await getMenu();
  console.log({ data });
  return (
    <html lang="en" className={`${poppins.variable}, ${aboreto.variable}`}>
      <body className="font-body">
        <MainMenu
          ctaDestination={data.callToActionDestination}
          ctaLabel={data.callToActionLabel}
          items={data.mainMenuItems}
        />
        {children}
      </body>
    </html>
  );
}
