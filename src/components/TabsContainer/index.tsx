import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(
  props: TabPanelProps
) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography
            component={
              "span"
            }>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(
  index: number
) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type CustomTab = {
  label: string;
  index: number;
  content: any;
};

interface CustomTabsContainerProps {
  tabs: CustomTab[];
}

export default function BasicTabs(
  props: CustomTabsContainerProps
) {
  const [value, setValue] =
    React.useState(0);

  const handleChange = (
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor:
            "divider",
        }}>
        <Tabs
          value={value}
          onChange={(
            // @ts-ignore:next-line
            e,
            value
          ) =>
            handleChange(
              value
            )
          }
          aria-label='basic tabs example'>
          {props.tabs.map(
            (tab) => (
              <Tab
                key={
                  tab.index
                }
                label={
                  tab.label
                }
                {...a11yProps(
                  tab.index
                )}
              />
            )
          )}
        </Tabs>
      </Box>
      {props.tabs.map(
        (tab) => (
          <CustomTabPanel
            key={tab.index}
            value={value}
            index={tab.index}>
            {tab.content}
          </CustomTabPanel>
        )
      )}
    </Box>
  );
}
