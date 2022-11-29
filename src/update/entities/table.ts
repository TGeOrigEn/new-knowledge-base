export const size = () => {
    var tableHead = document.getElementById('table-head');
    var tableBody = document.getElementById('table-body');

    if (tableHead == undefined) return;
    if (tableBody == undefined) return;

    var headCells = tableHead.getElementsByTagName('th');
    var firstTD = tableBody.getElementsByTagName('tr')[0];

    if (firstTD == undefined) return

    var bodyCells = firstTD.getElementsByTagName('td');

    if (headCells == undefined) return;
    if (bodyCells == undefined) return;

    for (var index = 0; index < bodyCells.length; index++) {
        var headHandler = createHandler();

        const a = headCells[index].getElementsByClassName("handler")
        for (var i = 0; i < a.length; i++)
            headCells[index].removeChild(a[i]);

        headCells[index].appendChild(headHandler);

        setListeners(headHandler, index);
    }

    function setListeners(handler: HTMLDivElement, index: number) {

        var nextCellWidth: number | undefined;
        var currentCellWidth: number | undefined;

        var pageX: number | undefined = 0;

        const currentColumn = handler.parentElement as HTMLTableCellElement;
        const nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement;

        const rows = tableBody!.getElementsByTagName('tr');

        var currentColumns = Array<HTMLTableCellElement>();
        var nextColumns = Array<HTMLTableCellElement>();

        for (var i = 0; i < rows.length; i++)
            currentColumns.push(rows[i].getElementsByTagName('td')[index]);

        if (nextColumn)
            for (var i = 0; i < rows.length; i++)
                nextColumns.push(rows[i].getElementsByTagName('td')[index + 1]);



        currentColumn.style.width = getComputedPropertyValue(currentColumn, 'width');
        currentColumns.forEach(column => column.style.width = getComputedPropertyValue(currentColumn, 'width'));

        if (index == 8) return;

        handler.style.cursor = 'col-resize';

        handler.addEventListener('mousedown', function (e) {
            pageX = e.pageX;

            var padding = getPaddingDifference(currentColumn);

            currentCellWidth = currentColumn!.offsetWidth - padding;

            if (nextColumn)
                nextCellWidth = nextColumn.offsetWidth - padding;
        });

        document.addEventListener('mousemove', function (e) {

            var diffX = e.pageX - pageX!;

            if (nextColumns.length != 0)
                nextColumns.forEach(column => column.style.width = (nextCellWidth! - (diffX)) + 'px');

            if (nextColumn)
                nextColumn.style.width = (nextCellWidth! - (diffX)) + 'px';

            currentColumn.style.width = (currentCellWidth! + diffX) + 'px';
            currentColumns.forEach(column => column.style.width = (currentCellWidth! + diffX) + 'px');
        });

        document.addEventListener('mouseup', function (e) {
            pageX = undefined;
        });

        handler.addEventListener('dblclick', function (e) {
            if (nextColumn)
                nextColumn.style.width = '';
            currentColumn.style.width = '';
            if (nextColumn)
                nextColumns.forEach(column => column.style.width = getComputedPropertyValue(nextColumn, 'width'));
            currentColumns.forEach(column => column.style.width = getComputedPropertyValue(currentColumn, 'width'));
            if (nextColumn)
                nextColumn.style.width = getComputedPropertyValue(nextColumn, 'width');
            currentColumn.style.width = getComputedPropertyValue(currentColumn, 'width');
        });

        currentColumn.style.width = getComputedPropertyValue(currentColumn, 'width');
        currentColumns.forEach(column => column.style.width = getComputedPropertyValue(currentColumn, 'width'));
    }

    function createHandler(): HTMLDivElement {
        var divElement = document.createElement('div');
        divElement.style.position = 'absolute';
        divElement.style.userSelect = 'none';
        divElement.style.width = '5px';
        divElement.style.height = '100%'
        divElement.style.right = "0";
        divElement.style.top = "0";
        divElement.className = "handler";
        return divElement;
    }

    function getPaddingDifference(cell: HTMLTableCellElement): number {
        var paddingRight = getComputedPropertyValue(cell, 'padding-right');
        var paddingLeft = getComputedPropertyValue(cell, 'padding-left');
        return (parseInt(paddingLeft) + parseInt(paddingRight));
    }

    function getComputedPropertyValue(element: HTMLTableCellElement, property: string): string {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
} 