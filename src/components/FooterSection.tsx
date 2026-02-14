const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <p className="font-display text-lg font-semibold text-foreground">
          Pop! Airways
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Contact:{" "}
          <a
            href="mailto:contact@popairways.com"
            className="text-primary hover:underline"
          >
            contact@popairways.com
          </a>
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Pop! Airways is a virtual airline for flight simulation purposes only.
          Not affiliated with any real-world airline or aviation organization.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pop! Airways. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
