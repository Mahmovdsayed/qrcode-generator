'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/navbar";
import { Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
    const { theme, setTheme } = useTheme()

    return <>
        <Navbar isBordered>
            <NavbarBrand>
                <p className="font-bold text-inherit">QR Code Generator</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        radius="full"
                        as={Link}
                        className="bg-default-200 w-full text-black dark:bg-default-100 dark:text-white font-medium"
                        variant="flat"
                        startContent={theme === 'dark' ? <MdLightMode /> : <MdOutlineDarkMode />}
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    </>;
};

export default Header;