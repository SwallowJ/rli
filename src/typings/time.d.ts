declare namespace TIME {
    type timeValue<DateType> = DateType | null;

    type range<DateType = moment.Moment> = [timeValue<DateType>, timeValue<DateType>] | null;

    type timeType = timeValue<number | string | moment.Moment | undefined>;
}
