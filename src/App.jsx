import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { items } from "./routesConfig";
import "@mantine/core/styles.css";
import {
  AppShell,
  Flex,
  Group,
  MantineProvider,
  NavLink,
  Title,
  Box
} from "@mantine/core";
import { ToastContainer } from "react-toastify";
import TrackerPage from "./pages/trackerPage/TrackerPage";
import "./App.css"

export default function App() {
  return (
    <MantineProvider>
      <ToastContainer theme={"dark"} progressStyle={{ backgroundColor: "orange" }} />
      <AppShell
        layout="alt"
        padding="md"
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: "sm",
        }}
      >
        <AppShell.Header className="bg-primaryGray"/>  
        <AppShell.Navbar className="bg-primaryGray border-r-0">
          <Flex p={16}>
            <Title size={20} className="text-primaryOrange">Flexo Material Tracker</Title>
          </Flex>
          
          <Group pl={8} pr={8} mt={40}>
            {Object.entries(items).map(([groupTitle, groupItems]) => (
              <Box key={groupTitle}>
                <Title order={4} mb={4} className="text-white">
                  {groupTitle}
                </Title>
                <Group gap={2}>
                  {groupItems.map((item) => (
                    <NavLink
                      className={" text-white hover:bg-primaryOrange hover:text-primaryGray rounded"}
                      href={item.path}
                      key={item.name}
                      label={item.name}
                      leftSection={item.icon}
                    />
                  ))}
                </Group>
              </Box>
            ))}
          </Group>
        </AppShell.Navbar>
        <AppShell.Main>
          {/* <Component {...pageProps} /> */}
          <TrackerPage/>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
