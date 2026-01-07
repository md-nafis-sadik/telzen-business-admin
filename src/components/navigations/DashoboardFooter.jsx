function DashboardFooter() {
  return (
    <footer className="flex flex-col gap-4 lg:flex-row justify-between items-center">
      <div className="font-light leading-none text-black-600 flex items-center gap-1.5">
        <span>
          © 2025{" "}
          <span className="text-main-600 font-semibold leading-none">
            Easy Ventures
          </span>
        </span>
        <span className="text-black-600">|</span>

        <span>All Right Reserved</span>
      </div>
      {/* <div className="flex items-center justify-center gap-3">
        <span className="text-justify justify-start text-main-600 font-semibold leading-none">
          Help Center
        </span>
        <span className="text-black-600">|</span>
        <div className="flex items-center justify-center gap-2.5">
          <span>
            <FooterLinkedInIconSvg />
          </span>
          <span>
            <FooterTwitterIconSvg />
          </span>
          <span>
            <FooterInstagramIconSvg />
          </span>
          <span>
            <FooterFacebookIconSvg />
          </span>
        </div>
      </div> */}
    </footer>
  );
}

export default DashboardFooter;
