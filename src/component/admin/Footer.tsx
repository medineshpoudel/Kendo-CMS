import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
const Footer = () => {
  return (
    <>
      <AppBar
        position={"bottom"}
        themeColor={"dark"}
        style={{ background: "#1F5DC9" }}
      >
        <AppBarSpacer style={{ width: 150 }} />

        <AppBarSection>
          <ul>
            <li>
              <span>Contact</span>
            </li>
            <li>
              <span>About</span>
            </li>
            <li>
              <span>Career</span>
            </li>
          </ul>
        </AppBarSection>

        <AppBarSpacer style={{ width: 100 }} />
      </AppBar>
    </>
  );
};
export default Footer;
