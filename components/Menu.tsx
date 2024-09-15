import React from "react";
import MenuPosts from "./MenuPosts";
import MenuCategories from "./MenuCategories";

const Menu: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 mt-14">
      <section>
        <h2 className="text-gray-700 text-lg font-light">{"What's hot"}</h2>
        <h1 className="text-2xl">Most Popular</h1>
        <MenuPosts withImage={false} />
      </section>

      <section>
        <h2 className="text-gray-700 text-lg font-light">Discover by topic</h2>
        <h1 className="text-2xl pb-4">Categories</h1>
        <MenuCategories />
      </section>

      <section>
        <h2 className="text-gray-700 text-lg font-light">Chosen by the editor</h2>
        <h1 className="text-2xl">Editors Pick</h1>
        <MenuPosts withImage={true} />
      </section>
    </div>
  );
};

export default Menu;
