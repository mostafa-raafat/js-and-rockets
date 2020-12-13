// Please implement your solution in this file

/**
 * Sort Missions By (Launch Data & Payloads Length).
 * @param {Object[]} missions
 * @return {Object[]}
 */
const sortMissions = (missions) =>
missions.sort((prevMission, nextMission) => {
        const prevPayload = prevMission.rocket.second_stage.payloads.length;
        const nextPayload = nextMission.rocket.second_stage.payloads.length;
        const prevLaunchDate = new Date(prevMission.launch_date_utc);
        const nextLaunchDate = new Date(nextMission.launch_date_utc);

        // Missions that carried more payloads should appear first.
        if (prevPayload > nextPayload) return -1;
        if (prevPayload < nextPayload) return 1;

        // Missions should appear in inverse chronological order.
        if (prevLaunchDate > nextLaunchDate) return -1;
        if (prevLaunchDate < nextLaunchDate) return 1;

        return 0;
    });

/**
 * Filter Missions By Launch Year.
 * @param {Object[]} missions
 * @return {Object[]}
 */
const filterByLaunchYear = (missions, year) =>
    missions.filter((mission) => mission.launch_year === String(year));

/**
 * Filter Missions By Customer Name.
 * @param {Object[]} missions
 * @return {Object[]}
 */
const filterByCustomerName = (missions, customerName) => {
    return missions.reduce((acc, mission) => {
        const payloads = mission.rocket.second_stage.payloads;
        const hasCustomerName = payloads.some((payload) =>
            payload.customers.some((customer) =>
                customer.includes(customerName)
            )
        );
        if (hasCustomerName) {
            acc.push({
                flight_number: mission.flight_number,
                mission_name: mission.mission_name,
                payloads_count: payloads.length,
            });
        }
        return acc;
    }, []);
};

/**
 * Prepare Missions Before Rendering.
 * @param {Object[]} missions
 * @return {function} Returns a function that should be called with missions.
 */
export const prepareData = (filterParams) => (missions) => {
    // Filter Missions By Launch Year.
    let results = filterByLaunchYear(missions, filterParams.year);
    // Sort Missions By (Launch Date & payload length).
    results = sortMissions(results);
    // Filter Missions By Customer Name.
    return filterByCustomerName(results, filterParams.customerName);
};

/**
 * Render Missions To DOM.
 * @param {Object[]} missions
 * @return {void}
 */
export const renderData = (data) => {
    const container = document.getElementById("out");
    container.innerHTML = JSON.stringify(data, undefined, 2);
};
