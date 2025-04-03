"use client";

import { BookFilterProvider } from "@/src/context/BookFilterContext";
import { PropsWithChildren } from "react";

const ShopLayout = ({ children }: PropsWithChildren) => {
   return <BookFilterProvider>{children}</BookFilterProvider>;
};

export default ShopLayout;
