import Link from "next/link";
import ButtonLink from "../ButtonLink";

const MainMenu = ({ items, ctaLabel, ctaDestination }) => {
  return (
    <div className="bg-slate-800 text-white px-5 h-[64px] flex items-center justify-between  sticky top-0 z-20 ">
      <div className="py-5 text-pink-600">Logo</div>

      <div className="flex">
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="hover:bg-slate-700 cursor-pointer group relative"
          >
            <div>
              <Link href={item.destination} className="p-5 block">
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-left absolute right-0 top-full -mt-3 flex">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.id}
                    href={subMenuItem.destination}
                    className="block whitespace-nowrap p-5 hover:bg-slate-700"
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <ButtonLink label={ctaLabel} destination={ctaDestination} />
      </div>
    </div>
  );
};

export default MainMenu;
