export interface SoftwareAppJsonLdProps {
  "@context": string;
  "@type": string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  description: string;
}


export function SoftwareAppJsonLd(props: SoftwareAppJsonLdProps) {
    const result: SoftwareAppJsonLdProps = {
        "@context": props["@context"],
        "@type": props["@type"],
        name: props["name"],
        applicationCategory: props["applicationCategory"],
        operatingSystem: props["operatingSystem"],
        url: props["url"],
        description: props["description"],
    };
    return result;
}