class APIFeatures:
    def __init__(self, query, args):
        self.query = query
        self.args = args

    def filter(self):
        for key, value in self.args.items():
            if hasattr(self.query.column_descriptions[0]['type'], key):
                column = getattr(self.query.column_descriptions[0]['type'], key)
                if "id" in str(column):
                    print(value)
                    self.query = self.query.filter(column.__eq__(value))
                else:
                    self.query = self.query.filter(column.like(f'%{value}%'))
        return self

    def sort(self):
        sort_by = self.args.get('sort')
        if sort_by:
            if sort_by.startswith('-'):
                sort_by = sort_by[1:]
                column = getattr(self.query.column_descriptions[0]['type'], sort_by)
                self.query = self.query.order_by(column.desc())
            else:
                column = getattr(self.query.column_descriptions[0]['type'], sort_by)
                self.query = self.query.order_by(column)
        return self

    def limit_fields(self):
        fields = self.args.get('fields', None)
        if fields:
            fields_list = fields.split(',')
            self.query = self.query.with_entities(
                *[getattr(self.query.column_descriptions[0]['type'], field) for field in fields_list])
        return self

    def paginate(self):
        page = int(self.args.get('page', 1))
        limit = int(self.args.get('limit', 100))
        offset = (page - 1) * limit

        # Fetch total count before applying pagination
        total_count = self.query.count()

        self.query = self.query.offset(offset).limit(limit)
        return self.query.all(), total_count
