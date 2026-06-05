// import {Container} from "react-bootstrap";

// const About = () => {
//     return (
//         <Container >
//             <h1 className="text-2xl text-center text-uppercase">О компании</h1>
//             <p className="mb-2">Контент будет добавлен позже со страницы WP админки</p>
//         </Container>
//     );
// };

// export default About;

import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import { buildTrustPageMetadata, getTrustPageContent } from "@src/lib/content/trust-pages";

export const metadata: Metadata = buildTrustPageMetadata("about");

export default function AboutPage() {
    return <TrustPage page={getTrustPageContent("about")} />;
}
