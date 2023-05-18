package model

import (
	"math/rand"
	"time"

	"github.com/oklog/ulid"
)

func GenerateID() ulid.ULID {
	t := time.Now()
	return ulid.MustNew(ulid.Timestamp(t), ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0))
}
