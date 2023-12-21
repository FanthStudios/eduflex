import {
    Accordion as AccordionComponent,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

function Accordion({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <AccordionComponent type="single" className="w-full" collapsible>
            <AccordionItem value="item-1">{children}</AccordionItem>
        </AccordionComponent>
    );
}

function Head({ children }: { children: React.ReactNode }) {
    return <AccordionTrigger>{children}</AccordionTrigger>;
}

function Body({ children }: { children: React.ReactNode }) {
    return <AccordionContent>{children}</AccordionContent>;
}

Accordion.Head = Head;
Accordion.Body = Body;

export default Accordion;
