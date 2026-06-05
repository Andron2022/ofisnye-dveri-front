// import {Container} from "react-bootstrap";

// const Contacts = () => {
//     return (
//         <Container >
//             <h1 className="text-2xl text-center text-uppercase">Контакты</h1>
//             <p className="mb-2">Адрес, время работы и карта будут добавлены позже</p>
//         </Container>
//     );
// };

// export default Contacts;

import type { Metadata } from "next";
import TrustPage from "@src/components/content/TrustPage";
import { buildTrustPageMetadata, getTrustPageContent } from "@src/lib/content/trust-pages";

export const metadata: Metadata = buildTrustPageMetadata("contacts");

export default function ContactsPage() {
    return <TrustPage page={getTrustPageContent("contacts")} />;
}
