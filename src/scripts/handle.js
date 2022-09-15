const handle = (table) => {

    resizableGrid();

    function resizableGrid() {
        const row = table.getElementsByTagName('tr')[0];
        // var cols = row ? row.getElementsByClassName('targer-for-handler') : undefined;
        var cols = row ? row.children : undefined;
        if (!cols) return;

        for (var i = 1; i < cols.length - 1; i++) {
            const handler = createHandler();
            cols[i].appendChild(handler);
            setListeners(handler);
            setInterval(() => handler.style.height = `${table.offsetHeight - 5}px`, 50);
        }

        function setListeners(handlerElement) {
            const handler = {
                currentColumnWidth: undefined,
                nextColumnWidth: undefined,
                currentColumn: undefined,
                nextColumn: undefined,
                pageX: undefined,
            };

            handlerElement.addEventListener('mousedown', handlerDown);
            document.addEventListener('mousemove', handlerMove);
            document.addEventListener('mouseup', handlerUp);

            function handlerMove(event) {
                if (!handler.currentColumn) return;
                handler.currentColumn.style.width = `${handler.currentColumnWidth + event.pageX - handler.pageX}px`;
            };

            function handlerUp(event) {
                handler.currentColumnWidth = undefined;
                handler.nextColumnWidth = undefined;
                handler.currentColumn = undefined;
                handler.nextColumn = undefined;
                handler.pageX = undefined;
            };

            function handlerDown(event) {
                handler.pageX = event.pageX;
                handler.currentColumn = event.target.parentElement;
                handler.nextColumn = handler.currentColumn.nextElementSibling;

                const paddingDifference = getPaddingDifference(handler.currentColumn);

                handler.currentColumnWidth = handler.currentColumn.offsetWidth - paddingDifference;
                if (handler.nextColumn) handler.nextColumnWidth = handler.nextColumn.offsetWidth - paddingDifference;
            };
        }

        function createHandler() {
            const handler = document.createElement('div');
            handler.className = 'column-resize-handler';
            document.addEventListener('mouseup', () => handler.style.borderRight = '');
            return handler;
        }

        function getPaddingDifference(column) {
            if (getAttributeValue(column, 'box-sizing') == 'border-box') return 0;
            const paddingRight = getAttributeValue(column, 'padding-right');
            const paddingLeft = getAttributeValue(column, 'padding-left');
            return parseInt(paddingLeft) + parseInt(paddingRight);
        };

        function getAttributeValue(element, attributeName) {
            return window.getComputedStyle(element, null).getPropertyValue(attributeName);
        };
    };
};

export default handle;