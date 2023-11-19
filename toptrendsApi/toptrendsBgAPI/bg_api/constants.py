"""

    INFO:
    these constants and templates are designed to facilitate the construction of SQL queries
    for retrieving Google Trends data from specified BigQuery tables, with options for
    filtering by country, date, and sorting criteria. The templates allow flexibility
    in generating dynamic queries based on different parameters.

"""

INTERNATIONALS_TOP_TERMS = "`bigquery-public-data.google_trends.international_top_terms`"
INTERNATIONALS_TOP_RISING_TERMS = "`bigquery-public-data.google_trends.international_top_rising_terms`"

USA_TOP_TERMS = "`bigquery-public-data.google_trends.top_terms`"
USA_TOP_RISING_TERMS = "`bigquery-public-data.google_trends.top_rising_terms`"

QUERY = """
    SELECT
      term,
      rank,
      ROUND(AVG(score)) as score
    FROM
        {0}
    WHERE
        refresh_date = {1}
            {2}
    GROUP BY    
        term,rank
    ORDER BY
        {3}
    """

COUNTRY_TYPE = "and country_name='{0}'"
TERMASC = "term"
SCOREDSC = "score desc"
RANK = "rank"
TODAY = """(SELECT MAX(refresh_date) FROM {0})"""
ES_DATE = "DATE_SUB(('{0}'), INTERVAL {1} DAY)"
