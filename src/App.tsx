import { useState, useEffect } from "react";

export default function App() {
  const [bins, setBins] = useState(30);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/plot?bins=${bins}`);
      const text = await res.text();
      setSvg(text);
    }, 300);
    return () => clearTimeout(timer);
  }, [bins]);

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title border-bottom border-primary border-3 pb-2">
            Old Faithful Geyser Data
          </h1>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="bg-white p-3 rounded">
                <label htmlFor="bins" className="form-label">
                  Number of bins: {bins}
                </label>
                <input
                  id="bins"
                  type="range"
                  className="form-range"
                  min={1}
                  max={50}
                  value={bins}
                  onChange={(e) => setBins(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-md-9">
              <div
                className="text-center"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
