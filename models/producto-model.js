const getProductos = async (limit, page, order_by, vendedor_id) => {
    const offset = (page - 1) * limit;
    const order = order_by ? orderby.replace('', ' ') : 'id ASC';

    let queryParams = [];
    let query = `
        SELECT p.*
        FROM productos p `
    ;

    if (vendedor_id !== undefined && vendedor_id !== null) {
        query += ' WHERE p.vendedor_id = %L';
        queryParams.push(vendedor_id);
    } else {
        query += ' WHERE 1=1';
    }

    query += format(' ORDER BY %s', order);
    query += format(' LIMIT %L OFFSET %L', limit, offset);

    const finalQuery = format(query, ...queryParams);
    console.log("Executing SQL:", finalQuery);

    const result = await pool.query(finalQuery);
    return result.rows;
};
