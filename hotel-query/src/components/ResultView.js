import React from "react";
import "../styles.css";

export default function ResultView({ result }) {
  const textStyle = { fontSize: "16px" };
  return (
    <li className='sui-result'>
      <div className='sui-result__header'>
        <span
          className='sui-result__title'
          style={{
            fontWeight: "bold",
          }}
          // Snippeted results contain search term highlights with html and are
          // 100% safe and santitized, so we dangerously set them here
          dangerouslySetInnerHTML={{ __html: result.hotels.snippet }}
        />
      </div>
      <div className='sui-result__body'>
        <ul className='sui-result__details'>
          <li>
            <span className='sui-result__key' style={textStyle}>
              Location
            </span>{" "}
            <span
              className='sui-result__value'
              style={textStyle}
              dangerouslySetInnerHTML={{
                __html: result.location.snippet,
              }}
            />
          </li>
          <li>
            <span className='sui-result__key' style={textStyle}>
              Average Review Score
            </span>{" "}
            <span className='sui-result__value' style={textStyle}>
              {result.avrreviewscore.raw}
            </span>
          </li>
          <li>
            <span className='sui-result__key' style={textStyle}>
              Popular Facilities
            </span>{" "}
            <span
              className='sui-result__value'
              style={textStyle}
              dangerouslySetInnerHTML={{
                __html: result.popularfacils.raw,
              }}
            />
          </li>
          <li>
            <span className='sui-result__key' style={textStyle}>
              What's Nearby
            </span>{" "}
            <span
              className='sui-result__value'
              style={textStyle}
              dangerouslySetInnerHTML={{
                __html: result.whatsnearby.raw,
              }}
            />
          </li>
          {result.accessibility.raw !== "" && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Accessibility
              </span>{" "}
              <span
                className='sui-result__value'
                style={textStyle}
                dangerouslySetInnerHTML={{
                  __html: result.accessibility.raw,
                }}
              />
            </li>
          )}
          {result.couplerating.raw !== -1 && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Couple Rating
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                {result.couplerating.raw}
              </span>
            </li>
          )}
          {result.distorchardmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Orchard MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                {result.distorchardmrt.raw}
              </span>
            </li>
          )}
          {!result.distorchardmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Orchard MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                Too far!
              </span>
            </li>
          )}
          {result.distcityhallmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to City Hall MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                {result.distcityhallmrt.raw}
              </span>
            </li>
          )}
          {!result.distcityhallmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to City Hall MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                Too far!
              </span>
            </li>
          )}
          {result.distrafflesmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Raffles Place MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                {result.distrafflesmrt.raw}
              </span>
            </li>
          )}
          {!result.distrafflesmrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Raffles Place MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                Too far!
              </span>
            </li>
          )}
          {result.distesplanademrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Esplanade MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                {result.distesplanademrt.raw}
              </span>
            </li>
          )}
          {!result.distesplanademrt.raw && (
            <li>
              <span className='sui-result__key' style={textStyle}>
                Distance to Esplanade MRT Station (km)
              </span>{" "}
              <span className='sui-result__value' style={textStyle}>
                Too far!
              </span>
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}
