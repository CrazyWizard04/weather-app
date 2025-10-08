import React, { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import Icon from "@/app/components/ui/Icon";
import { useFavorites } from "@/app/store/useFavoritesStore";
import { useWeather } from "@/app/store/useWeather";

// Displays all favourite cities in a modal with the option to remove them
const FavouritesMenu = () => {
  const [open, setOpen] = useState(false);

  // Gets the favourites and the remove function from the context provider
  const { favorites, removeFavorite } = useFavorites();
  // Gets the setCity function so that when you click on a favorite, its weather is retrieved
  const { setCity } = useWeather();

  return (
    <>
      <Button
        desc="Favourites"
        open={open}
        setOpen={setOpen}
        iconLight="ui-icons/star-full.svg"
        iconDark="ui-icons/star-full.svg"
      />

      <Modal
        desc="My Favourites"
        size="max-w-sm md:max-w-md"
        open={open}
        setOpen={setOpen}
      >
        {favorites.length === 0 ? (
          <p className="mt-2">No saved locations yet :)</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {favorites.map((fav, i) => (
              <li
                key={`city-${i}`}
                className="search_label"
                onClick={() => {
                  setCity(fav);
                  setOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <div className="flex">
                    <CircleFlag
                      countryCode={fav.countryCode.toLowerCase()}
                      className="size-6"
                    />
                    <p className="ml-2 text-lg">
                      {fav.name}, {fav.country}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {fav.region} ({fav.latitude}°N, {fav.longitude}°E)
                  </p>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(fav);
                  }}
                >
                  <Icon
                    name="delete"
                    width={25}
                    height={25}
                    needsTheme={false}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
};

export default FavouritesMenu;
