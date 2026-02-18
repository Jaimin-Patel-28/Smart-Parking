const ReportIssueForm = () => {
  return (
    <section>
      <h2>Report an Issue</h2>
      <select>
        <option>Select Issue Category</option>
      </select>
      <input type="text" placeholder="Subject" />
      <textarea placeholder="Describe your issue"></textarea>
      <input type="file" />
      <button>Submit Ticket</button>
    </section>
  );
};

export default ReportIssueForm;
