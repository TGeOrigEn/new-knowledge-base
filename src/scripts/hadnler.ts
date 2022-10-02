interface Handler {
    currentHedaer: Header,
    nextHeader: Header,
    pageX: number | undefined,
}

interface ClassName {
    headline: string,
    handler: string
}

interface Header {
    element: HTMLElement | null,
    width: number | undefined
}

export default function handler(tableElement: HTMLElement, className: ClassName): void {

    const headline = tableElement.getElementsByClassName(className.headline)[0];
    const headers = headline ? headline.children : undefined;
    if (!headers) return;

    for (var index = 1; index < headers.length - 1; index++) {
        const handlerElement = createHandler();
        headers[index].appendChild(handlerElement);
        setListeners(handlerElement, index);
        setInterval(() => updateHeight(handlerElement), 1000);
    }

    function updateHeight(handlerElement: HTMLDivElement) {
        const height = getComputedStyle(tableElement).height;
        const value = Number(height.substring(0, height.length - 4));
        handlerElement.style.height = `${value - 1}px`;
    }

    function setListeners(handlerElement: HTMLDivElement, index: number): void {
        const handler: Handler = {
            currentHedaer: { element: null, width: undefined },
            nextHeader: { element: null, width: undefined },
            pageX: undefined
        };

        handlerElement.addEventListener('dblclick', handlerDoubleClick);
        handlerElement.addEventListener('mousedown', mouseDown);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        function handlerDoubleClick(event: MouseEvent): void {
            (event.target as Element).parentElement!.style.width = '';
        };

        function mouseDown(event: MouseEvent) {
            (headers![index] as HTMLElement).style.borderRight = '2px red solid';

            const rows = tableElement.getElementsByTagName('tbody')[0].children;
            for (var i = 0; i < rows.length; i++)
                (rows[i].children[index] as HTMLElement).style.borderRight = '2px red solid';

            handler.pageX = event.pageX;

            handler.currentHedaer.element = (event.target as Element).parentElement!;
            handler.nextHeader.element = (handler.currentHedaer.element.nextElementSibling as HTMLElement);

            const paddingDifference = getPaddingDifference(handler.currentHedaer.element);

            handler.currentHedaer.width = handler.currentHedaer.element.offsetWidth - paddingDifference;
            if (handler.nextHeader.element) handler.nextHeader.width = handler.nextHeader.element.offsetWidth - paddingDifference;
        };

        function mouseMove(event: MouseEvent) {
            if (!handler.currentHedaer.element) return;

            if (handler.nextHeader.element)
                handler.nextHeader.element.style.width = `${handler.nextHeader.width! - event.pageX + handler.pageX!}px`;
            handler.currentHedaer.element.style.width = `${handler.currentHedaer.width! + event.pageX - handler.pageX!}px`;
        };

        function mouseUp() {
            (headers![index] as HTMLElement).style.borderRight = '1px black solid';

            const rows = tableElement.getElementsByTagName('tbody')[0].children;
            for (var i = 0; i < rows.length; i++)
                (rows[i].children[index] as HTMLElement).style.borderRight = '1px black solid';

            handler.currentHedaer = { element: null, width: undefined };
            handler.nextHeader = { element: null, width: undefined };
            handler.pageX = undefined;
        };
    };

    function createHandler(): HTMLDivElement {
        const handler = document.createElement('div');
        handler.className = className.handler;
        handler.style.height = getComputedStyle(tableElement).height;
        return handler;
    };

    function getPaddingDifference(header: HTMLElement) {
        const paddingRight = getComputedPropertyValue(header, 'padding-right');
        const paddingLeft = getComputedPropertyValue(header, 'padding-left');
        return parseInt(paddingLeft) + parseInt(paddingRight);
    };

    function getComputedPropertyValue(element: Element, propertyName: string): string {
        return window.getComputedStyle(element, null).getPropertyValue(propertyName);
    };
};
