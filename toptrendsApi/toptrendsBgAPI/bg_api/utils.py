from google.cloud import bigquery
from .constants import *

"""

This Metod return the Bigquery from the parametters

Function called obt_top25 that fetches data from a Google BigQuery database based on specified parameters. 
These parameters include the country name, whether to retrieve top terms or top rising terms, 
the date for data retrieval, and sorting preferences.

Here's a simplified breakdown:

Database and Table Selection: Determines which BigQuery database and table to query based on the country and the type of data (top terms or top rising terms).
Date Selection:               Constructs a date based on whether data for the current day is requested (is_today) or a specific date (es_date).
Sorting Preferences:          Determines whether to sort the results by rank or score.
SQL Query Construction:       Builds an SQL query using the selected parameters.
Query Execution:              Sends the SQL query to the BigQuery database and retrieves the results.
Result Processing:            Converts the query results into a list of dictionaries for easier handling.
Return:                       Returns the processed data.

"""


def obt_top25(
        country_name='Colombia',
        top_terms=False,
        top_rising_term=False,
        es_date='2023-10-12',
        is_today=False,
        is_orderRank=False,
        is_orderScore=False):
    client = bigquery.Client()
    db = ""
    cc = ""
    date = ""
    order = ""

    if top_terms and country_name == 'USA':
        db = USA_TOP_TERMS
    elif top_rising_term and country_name == 'USA':
        db = USA_TOP_RISING_TERMS

    elif top_terms and country_name != 'USA':
        cc = COUNTRY_TYPE.format(country_name)
        db = INTERNATIONALS_TOP_TERMS
    elif top_rising_term and country_name != 'USA':
        cc = COUNTRY_TYPE.format(country_name)
        db = INTERNATIONALS_TOP_RISING_TERMS

    if is_today:
        date = TODAY.format(db)
    elif es_date != '':
        date = ES_DATE.format(es_date, 0)

    if is_orderRank:
        order = TERMASC
    elif is_orderScore:
        order = SCOREDSC
    else:
        order = RANK

    sql_query = QUERY.format(db, date, cc, order)
    query_job = client.query(sql_query)
    results = query_job.result()

    # Convierte los resultados a un formato que se pueda enviar como respuesta HTTP
    data = []
    for row in results:
        # Cast
        data.append(dict(row.items()))

    return data
