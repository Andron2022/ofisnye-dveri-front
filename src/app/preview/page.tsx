// src/app/preview/page.tsx


// Импортируй любые другие из components или commonsections

import Header from "@src/components/Headers/Header";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import AddToCardModal from "@src/commonsections/AddToCardModal";

const PreviewPage = () => {
    return (
        <div className="p-10 space-y-20">
            <h1 className="text-4xl font-bold">Preview компонентов</h1>
            
            <section>
                <h2 className="text-2xl mb-6">Block I</h2>
                <AddToCardModal />
            </section>
            
            <section>
                <h2 className="text-2xl mb-6">Blick 2</h2>
                <ViewedProduct />
            </section>
            
            {/* Добавь любые другие компоненты с пропсами */}
        </div>
    );
}

export default PreviewPage;