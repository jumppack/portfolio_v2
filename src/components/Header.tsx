"use client";

import { usePathname } from "next/navigation";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { TimeDisplay } from "./TimeDisplay";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";

  const navigationItems = [
    {
      path: "/about",
      label: about.label,
      icon: "person",
      display: !!routes["/about"]
    },
    {
      path: "/work",
      label: work.label,
      icon: "grid",
      display: !!routes["/work"]
    },
    {
      path: "/blog",
      label: blog.label,
      icon: "book",
      display: !!routes["/blog"]
    },
    {
      path: "/gallery",
      label: gallery.label,
      icon: "gallery",
      display: !!routes["/gallery"]
    }
  ];

  const isPathActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              
              {navigationItems.map((item) => (
                item.display && (
                  <div key={item.path} style={{ display: 'contents' }}>
                    <Row s={{ hide: true }}>
                      <ToggleButton
                        prefixIcon={item.icon}
                        href={item.path}
                        label={item.label}
                        selected={isPathActive(item.path)}
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <ToggleButton
                        prefixIcon={item.icon}
                        href={item.path}
                        selected={isPathActive(item.path)}
                      />
                    </Row>
                  </div>
                )
              ))}

              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
